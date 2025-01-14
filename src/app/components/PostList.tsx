'use client';


import Link from 'next/link';
import { useState } from 'react';

interface Post {
    id?: number;
    title?: string;
    content?: string; // Store content as raw JSON string
    featured?: boolean;
}

export default function PostList({ posts }) {

    const[notification, setNotification] = useState<string>("")

    return (
        <div>
            <div>
                {notification && (
                     <div className="fixed top-15 mb-8 right-18 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow-lg">
                        {notification}
                    </div>
                )}
            </div>
            {posts.map((post) => (
                <li
                    key={post.id}
                    className="list-none ml-2 pb-3 rounded-lg transition-transform"
                >
                    <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-blue-600 font-medium underline hover:no-underline hover:text-blue-800 cursor-pointer"
                    >
                        {post.featured ? `*${post.title}` : post.title}
                    </Link>
                    <button
                        className="ml-2 mr-2 bg-red-600 hover:bg-red-700 rounded-lg pl-1 pr-1 p-0.5 text-white text-sm"
                        onClick={() => handleDelete(post)}
                    >
                        X
                    </button>
                    <div>
                        <label className="mr-1 text-sm font-medium text-gray-700">Featured</label>
                        <input
                            type="checkbox"
                            name="archived"
                            checked={post.featured}
                            className="mt-1 mr-2.5"
                            onChange={(e) => handleFeature(post, e.target.checked)}
                        />
                        <label className="mr-1 text-sm font-medium text-gray-700">Archived</label>
                        <input
                            type="checkbox"
                            name="archived"
                            checked={post.archived}
                            className="mt-1"
                            onChange={(e) => handleArchive(post, e.target.checked)}
                        />
                    </div>
                </li>
            ))}
        </div>
    );
}
