import imageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home({ posts }) {
  const router = useRouter()
  const [mappedPosts, setMappedPosts] = useState([])

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'nx46hqrh',
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
      <div className="grid p-4">
        <h1 className="p-12 text-center text-4xl font-extrabold text-gray-800 dark:text-white">
      Blog Posts 📎
        </h1>


        <div className="p-3">
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div
                onClick={() => router.push(`/post/${p.slug.current}`)}
                key={index}
                className="max-w-2xl space-x-8 mx-auto overflow-hidden rounded-lg shadow-lg cursor-pointer "
              >
                <img className="object-cover w-full h-full sborder-4 rounded-lg scale-75 border-gray-800 dark:border-gray-400" src={p.mainImage} />
                <h3 className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white hover:text-gray-600 hover:underline">{p.title}</h3>
                
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
  const url = `https://nx46hqrh.api.sanity.io/v1/data/query/production?query=${query}`
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
