import type { NextPage } from 'next'

import { client } from "@/graphql/client";
import { BooksDocument, BooksQuery, BooksQueryVariables, useBooksQuery, useAddBookMutation } from "@/graphql/generated/graphql";
import { Transition, Dialog } from '@headlessui/react'
import { useState, Fragment } from 'react';
import { useEffect } from 'react';

// For SSR
// export const getServerSideProps = async () => {
//   const { data } = await client.query<BooksQuery, BooksQueryVariables>({
//     query: BooksDocument,
//   });
//   return { props: { initialData: data } };
// };

// export default memo<InferGetServerSidePropsType<typeof getServerSideProps>>(({ initialData }) => {
const Home: NextPage = () => {
  const { data, refetch } = useBooksQuery();
  const [addBook] = useAddBookMutation();
  const booksData = data?.books
  const [isShowing, setIsShowing] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  const [inputState, setInputState] = useState({
    title: '',
    price: 0,
    author: ''
  });

  const onInputTitle = (e: any) => {
    setInputState({ ...inputState, title: e.target.value })
  };
  const onInputPrice = (e: any) => {
    setInputState({ ...inputState, price: parseInt(e.target.value) })
  };
  const onInputAuthor = (e: any) => {
    setInputState({ ...inputState, author: e.target.value })
  };

  async function addNewBook() {
    console.log(inputState)
    try {
      await addBook({
        variables: {
          newBook: {
            title: inputState.title,
            price: inputState.price,
            author: [inputState.author]
          }
        }
      });
      await refetch()
      console.log(data)

    } catch (err) {
      console.log(err)
    }

    setIsOpen(false)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        BOOKS TABLE
      </h1>
      {booksData && (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">CreatedAt</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {booksData.map((book) =>
              <tr>
                <td className="border px-4 py-2">{book.id}</td>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.price}</td>
                <td className="border px-4 py-2">{book.createdAt}</td>
                <td className="border px-4 py-2"><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>edit</button></td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Tips
      </button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        I will fade in and out
      </Transition>

      <div className="mt-10">
        <button
          type="button"
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Books
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Books
                </Dialog.Title>
                <form className="mt-2">
                  <label className="block text-gray-700 text-sm font-bold mt-2">
                    Tittle
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tittle" type="text" placeholder="Tittle" value={inputState.title} onChange={onInputTitle}></input>

                  <label className="block text-gray-700 text-sm font-bold mt-2">
                    Price
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Price" value={inputState.price} onChange={onInputPrice}></input>

                  <label className="block text-gray-700 text-sm font-bold mt-2">
                    author
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="Author" value={inputState.author} onChange={onInputAuthor}></input>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={addNewBook}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Home
