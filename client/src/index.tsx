/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App'
import { Router } from "@solidjs/router";
import { QueryClientProvider, QueryClient } from "@tanstack/solid-query"
const root = document.getElementById('root')
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'

render(
    () => {
        const queryClient = new QueryClient()

        return (
            <Router >
                <QueryClientProvider client={queryClient}>
                    <App />
                    <SolidQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
                <div id='loader'></div>
            </Router>
        )
    },
    root!
);