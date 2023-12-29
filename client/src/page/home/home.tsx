import { useUserRedux } from "../../redux/index"


function Home() {
    const [user] = useUserRedux()

    return (
        <>
            <h1>home page</h1>
            <div>
                <p>Name</p>
            </div>
            <button>remove</button>
            <button onclick={() => console.log(user)}>show</button>
        </>
    );
}


export default Home