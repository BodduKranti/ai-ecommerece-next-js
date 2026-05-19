import Link from "next/link"

interface BreadcrumbItem {
    id: number,
    pagename: string,
    href: string
}

interface BreadcrumbProps {
    breadcrumbs: BreadcrumbItem[]
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbProps) => {
    return (
        <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex items-center space-x-2 w-full ">
                {breadcrumbs.map((breadcrumb, index) => (
                    breadcrumb.href === '' ?
                        <li key={breadcrumb.id} className="text-sm">
                            <div className="flex items-center">
                                <span className="font-medium text-gray-500 hover:text-gray-600">
                                    {breadcrumb.pagename}
                                </span>
                                {
                                    index !== breadcrumbs.length - 1 && <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                }
                            </div>
                        </li>
                        :
                        <li key={breadcrumb.id}>
                            <div className="flex items-center">
                                <Link
                                    href={breadcrumb.href}
                                    // className="font-medium text-gray-500 hover:text-gray-600"
                                    // href={{
                                    //     pathname: breadcrumb.href,
                                    //     query: { title: breadcrumb.pagename, id: breadcrumb.id },
                                    // }}
                                    aria-current="page" className="mr-2 text-sm font-medium text-gray-900">
                                    {breadcrumb.pagename}
                                </Link>
                                {
                                    index !== breadcrumbs.length - 1 && <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                }
                            </div>
                        </li>
                ))}

            </ol>
        </nav>
    )
}

export default Breadcrumb
