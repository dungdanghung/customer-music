import { createContext, createSignal, useContext, Component, JSXElement } from 'solid-js'

const UserContext = createContext<any>();

const UserProvider: Component<{ children: JSXElement }> = (props) => {
    const [test, settest] = createSignal({})
    return (
        <UserContext.Provider value={{ test, settest }}>
            {props.children}
        </UserContext.Provider>
    )
};

export function usedata() {
    return useContext(UserContext);
}

export default UserProvider