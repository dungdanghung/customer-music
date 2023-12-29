import {
    QueryClient,
    QueryClientProvider,
    createInfiniteQuery,
    createMutation
} from '@tanstack/solid-query'
import { Match, Switch } from 'solid-js'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import axios from 'axios'
const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Example />
            <SolidQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

//https://api.github.com/repos/tannerlinsley/react-query
//https://jsonplaceholder.typicode.com/todos
// const getCharacters = async (page: any) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${page}`);
//     const results = await res.json();
//     return results
// };

const senRequest = async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/posts");
};

function Example() {
    // @ts-ignore
    const query = createInfiniteQuery(() => ({
        queryKey: ['test'],
        queryFn: ({ pageParam = 1 }) => getCharacters(pageParam),
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1
        },
    }));


    const { mutate } = createMutation(() => ({
        mutationFn: () => senRequest(),
    }));

    function handleSubmit() {
        mutate();
    };

    return (
        // <Switch>
        //     <Match when={query.isPending}>Loading...</Match>
        //     <Match when={query.isError}>Error</Match>
        //     <Match when={query.isSuccess}>
        //         <div>
        //             {
        //                 query.data?.pages.map((page: any) => (
        //                     <div>
        //                         <h1>{page.id}</h1>
        //                     </div>
        //                 ))
        //             }
        //             <button onclick={() => query.fetchNextPage()}>
        //                 {
        //                     query.isFetchingNextPage ?
        //                         'loading...' :
        //                         'more item'
        //                 }
        //             </button>
        //         </div>
        //     </Match>
        // </Switch>
        <button onclick={handleSubmit}>test</button>
    )
}
