// src/components/NewsCard.tsx

import React from "react";
import { News } from "../types"; // suppongo tu abbia tipo News simile a Rule

interface NewsCardProps {
  news: News;
  index?: number;
  searchTerm?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, index, searchTerm }) => {
  const highlightText = (text: string, term: string) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-400/40 text-yellow-100 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-gradient-to-r from-teal-800/40 to-emerald-800/40 backdrop-blur-sm rounded-lg sm:rounded-xl border border-teal-400/30 p-4 sm:p-5 lg:p-6 hover:border-orange-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20 group">
      <div className="flex items-start space-x-3 sm:space-x-4">
        {index !== undefined && (
          <div className="flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white text-xs sm:text-sm font-bold">
                {index}
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 break-words">
            {highlightText(news.title, searchTerm || "")}
          </h3>
          <div className="text-teal-100 leading-relaxed prose prose-invert prose-sm sm:prose-base max-w-none break-words [&>*]:break-words">
            {searchTerm
              ? highlightText(news.content, searchTerm)
              : news.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
