import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    name: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, content, name }) => {
    return (
        <div key={id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
                <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold shadow-inner">
                            {name[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h2>
                <p className="text-gray-600 line-clamp-3">{content}</p>
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <Link to={`/blogs/${id}`} className="text-blue-500 font-semibold">Read More</Link>
                <span className="text-gray-500 text-sm">Posted by {name}</span>
            </div>
        </div>
    );
};

export default BlogCard;

