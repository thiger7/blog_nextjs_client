import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Post } from '../types'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

type Props = {
  posts: Post[];
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();

  console.log(posts)

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24,
  };
}

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }: Props) {
  return (
    <>
      <div className={styles.homeContainer}>
        <h2>Rails & Next.js Blog</h2>
        <Link href="/create-post" className={styles.createButton}>
          Create new Post
        </Link>

        <div>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <Link href={`posts/${post.id}`} className={styles.postCardBox}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.content}</p>
              <button className={styles.editButton}>Edit</button>
              <button className={styles.deleteButton}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
