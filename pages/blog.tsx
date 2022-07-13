import Parser from 'rss-parser'
import { useEffect, useState } from 'react'
import SkeletonBlogEntry from '@components/SkeletonBlogEntry'

const Blog = () => {
  return (
    <div className="blog">
      <h1 className="p-12 text-center text-4xl font-extrabold text-gray-800 dark:text-white">
        Blog Posts 📎
      </h1>
      
      <p className="p-7 text-center text-sm font-light text-gray-800 dark:text-white">
      🔍 No blogs yet. Check back later.
      </p>
    
    </div>
  )
}

export default Blog
