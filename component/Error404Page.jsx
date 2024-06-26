import { useRouteError } from "react-router-dom"

export default function () {
    const error = useRouteError()
    console.log(error)
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <h1 style={{ margin: "-10px",color: "red",fontSize: "80px" }}>404 Not Found</h1>
            <p>Something went wrong...!!!</p>
        </div>
    )
}