// import Parser from 'rss-parser'
// import { useEffect, useState } from 'react'
// import SkeletonBlogEntry from '@components/SkeletonBlogEntry'

// const Blog = () => {
//   return (
//     <div className="blog">
//       <h1 className="p-12 text-center text-4xl font-extrabold text-gray-800 dark:text-white">
//         Blog Posts 📎
//       </h1>

//       <p className="p-7 text-center text-sm font-light text-gray-800 dark:text-white">
//         🔍 No blogs yet. Check back later.
//       </p>
//     </div>
//   )
// }

//export default Blog



import imageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home({ posts }) {
  const router = useRouter()
  const [mappedPosts, setMappedPosts] = useState([])

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'mjoyrhci',
        dataset: 'production',
      })

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      )
    } else {
      setMappedPosts([])
    }
  }, [posts])

  return (
    <div>

      <div className="p-12 text-center text-4xl font-extrabold text-gray-800 dark:text-white">
        <h1>Blog Posts 📎</h1>

        <h3>Recent Posts:</h3>

        <div className="">
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div
                onClick={() => router.push(`/post/${p.slug.current}`)}
                key={index}
                className="flex flex-col p-4 cursor-pointer"
              >
                <h3>{p.title}</h3>
                <img className="" src={p.mainImage} />
              </div>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "post" ]')
  const url = `https://mjoyrhci.api.sanity.io/v1/data/query/production?query=${query}`
  const result = await fetch(url).then((res) => res.json())

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    }
  } else {
    return {
      props: {
        posts: result.result,
      },
    }
  }
}
