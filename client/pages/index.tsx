import type { NextPage } from 'next'

import { client } from "@/graphql/client";
import { BooksDocument, BooksQuery, BooksQueryVariables, useBooksQuery } from "@/graphql/generated/graphql";


const Home: NextPage = () => {
  const { data, refetch } = useBooksQuery();
  const booksData = data?.books

  return (
    <div>
      {booksData && (
        <ul>
          {booksData.map((book) => <li>{book.id}:{book.title},{book.price}</li>)}
        </ul>
      )}
    </div>
  )
}

export default Home
