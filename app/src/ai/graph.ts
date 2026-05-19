import {
    START,
    END,
    StateGraph,
    Annotation,
    MessagesAnnotation,
} from "@langchain/langgraph";

import { ChatOllama } from "@langchain/ollama";

import {
    SystemMessage,
    HumanMessage,
} from "@langchain/core/messages";

// =========================
// OLLAMA MODEL
// =========================

const model = new ChatOllama({
    model: "llama3",
    temperature: 0,
});

// =========================
// STATE
// =========================

const StateAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,

    input: Annotation<string>({
        reducer: (_, value) => value,
        default: () => "",
    }),

    intent: Annotation<string>({
        reducer: (_, value) => value,
        default: () => "",
    }),

    output: Annotation<string>({
        reducer: (_, value) => value,
        default: () => "",
    }),

    error: Annotation<string>({
        reducer: (_, value) => value,
        default: () => "",
    }),
});

type State = typeof StateAnnotation.State;

// =========================
// DETECT INTENT NODE
// =========================

const detectIntentNode = async (
    state: State
) => {
    try {
        console.log(
            "Detect Intent Input:",
            state.input
        );

        const response = await model.invoke([
            new SystemMessage(
                "Return only one word: search or chatbot"
            ),

            new HumanMessage(state.input),
        ]);

        console.log(
            "Intent Response:",
            response.content
        );

        const intent =
            typeof response.content ===
                "string"
                ? response.content
                    .toLowerCase()
                    .trim()
                : "chatbot";

        return {
            intent:
                intent === "search"
                    ? "search"
                    : "chatbot",
        };
    } catch (error: any) {
        console.error(
            "Detect Intent Error:",
            error
        );

        return {
            intent: "chatbot",
            error:
                error?.message ||
                "Failed to detect intent",
        };
    }
};

// =========================
// CHATBOT NODE
// =========================

const chatbotNode = async (
    state: State
) => {
    try {
        console.log(
            "Chatbot Input:",
            state.input
        );

        const response = await model.invoke([
            new SystemMessage(
                "You are a helpful ecommerce assistant"
            ),

            new HumanMessage(state.input),
        ]);

        // API CALL
        const responseProducts = await fetch(
            `https://dummyjson.com/products/search?q=${state.input}`
        );

        const products: any = await responseProducts.json();

        // NO PRODUCTS
        // if (!products?.length) {
        //     return {
        //         output: "No products found",
        //     };
        // }

        console.log(
            "Search API Response:",
            products
        );

        const formattedProducts =
            products !== undefined &&
            products?.products
                .map((product: any) => {
                    return `
                        Title: ${product?.title}
                        Price: ₹${product?.price}
                        Description: ${product?.description}
                        SKU: ${product?.sku}
                        Return Policy: ${product?.returnPolicy}
                        `;
                })
                .join("\n");

        return {
            output: `
                    ${formattedProducts}

                    AI Response:
                    ${typeof response.content === "string"
                    ? response.content
                    : JSON.stringify(response.content)
                }
                `,
        };
    } catch (error: any) {
        console.error(
            "Chatbot Error:",
            error
        );

        return {
            output:
                "Something went wrong while processing your request.",

            error:
                error?.message ||
                "Unknown chatbot error",
        };
    }
};

// =========================
// SEARCH NODE
// =========================

const searchNode = async (
    state: any
) => {
    try {
        console.log(
            "Search Input:",
            state.input
        );




        // FORMAT PRODUCTS
        //         const formattedProducts = products
        //             .map((product: any) => {
        //                 return `
        // Title: ${product.title}
        // Price: ₹${product.price}
        // Link: ${product.url}
        //                 `;
        //             })
        //             .join("\n");

        const response = await model.invoke([
            new SystemMessage(
                "Help users search ecommerce products"
            ),

            new HumanMessage(state.input),
        ]);

        // API CALL
        const responseProducts = await fetch(
            `https://dummyjson.com/products/search?q=${state.input}`
        );

        const products: any = await responseProducts.json();

        // NO PRODUCTS
        // if (!products?.length) {
        //     return {
        //         output: "No products found",
        //     };
        // }

        console.log(
            "Search API Response:",
            products
        );

        const formattedProducts =
            products !== undefined &&
            products?.products
                .map((product: any) => {
                    return `Title: ${product?.title}
                        Price: ₹${product?.price}
                        Description: ${product?.description}
                        SKU: ${product?.sku}
                        Return Policy: ${product?.returnPolicy}`;
                })
                .join("\n");

        return {
            output: `
                    ${formattedProducts}

                    AI Response:
                    ${typeof response.content === "string"
                    ? response.content
                    : JSON.stringify(response.content)
                }
                `,
        };
    } catch (error: any) {
        console.error(
            "Search Error:",
            error
        );

        return {
            output:
                "Search service is temporarily unavailable.",

            error:
                error?.message ||
                "Unknown search error",
        };
    }
};

// =========================
// WORKFLOW
// =========================

const workflow = new StateGraph(
    StateAnnotation
)

    // ADD NODES
    .addNode("detectIntent", detectIntentNode)
    .addNode("chatbot", chatbotNode)
    .addNode("search", searchNode)
    // START FLOW
    .addEdge(START, "detectIntent")

    // CONDITIONAL ROUTING
    .addConditionalEdges(
        "detectIntent",
        (state: State) => {
            return state.intent ===
                "search"
                ? "search"
                : "chatbot";
        }
    )

    // END FLOW
    .addEdge("chatbot", END)

    .addEdge("search", END)

    .compile();

export default workflow;