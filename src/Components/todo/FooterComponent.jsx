import { useContext } from "react"
import { AuthContext } from "./Security/AuthContext"

function FooterComponent() {
    const authContext = useContext(AuthContext)
   // console.log(`Footer = ${authContext.number}` )
        
    return(
      
        <footer className="footer">
            <div className="container">
                Your Footer Information 
            </div>
        </footer>
    )
}

export default FooterComponent