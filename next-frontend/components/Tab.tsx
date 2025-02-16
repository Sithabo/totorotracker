"use client";
import { Tabs } from "flowbite-react";
import React from "react";

interface TabItem {
    title: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    content: React.ReactNode;
    active?: boolean;
}

interface TabProps {
    items: TabItem[];
}

export default function Tab({ items }: TabProps) {
    return (
        <Tabs
            aria-label="Tabs with underline"
            variant="underline"
            theme={{
                base: "flex flex-col gap-2",
                tablist: {
                    base: "flex text-center",
                    variant: {
                        default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
                        underline:
                            "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
                        pills:
                            "flex-wrap space-x-2 text-sm font-medium text-white dark:text-white",
                        fullWidth:
                            "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-white",
                    },
                    tabitem: {
                        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:text-white disabled:dark:text-white",
                        variant: {
                            default: {
                                base: "rounded-t-lg",
                                active: {
                                    on: "bg-gray-100 text-white dark:bg-gray-800 dark:text-white",
                                    off: "text-white hover:bg-gray-50 hover:text-white dark:text-white dark:hover:bg-gray-800 dark:hover:text-white",
                                },
                            },
                            underline: {
                                base: "rounded-t-lg",
                                active: {
                                    on: "active rounded-t-lg border-b-2 border-cyan-600 text-white dark:border-cyan-500 dark:text-white",
                                    off: "border-b-2 border-transparent text-white hover:border-gray-300 hover:text-white dark:text-white dark:hover:text-white",
                                },
                            },
                            pills: {
                                base: "",
                                active: {
                                    on: "rounded-lg bg-cyan-600 text-white",
                                    off: "rounded-lg hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800 dark:hover:text-white",
                                },
                            },
                            fullWidth: {
                                base: "ml-0 flex w-full rounded-none first:ml-0",
                                active: {
                                    on: "active rounded-none bg-gray-100 p-4 text-white dark:bg-gray-700 dark:text-white",
                                    off: "rounded-none bg-white hover:bg-gray-50 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
                                },
                            },
                        },
                        icon: "mr-2 h-5 w-5",
                    },
                },
            }}
        >
            {items.map((item, index) => (
                <Tabs.Item
                    style={{ color: "white" }}
                    key={index}
                    active={item.active}
                    title={item.title}
                    className="text-white"
                >
                    {item.content}
                </Tabs.Item>
            ))}
        </Tabs>
    );
}
