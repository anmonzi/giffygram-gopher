import { getDirectMessages, getUsers, setDisplayMessages } from "../data/provider.js"
import { getNavBar } from "../nav/NavBar.js"
// import { Footer } from "../nav/Footer.js"

//generating message list
// 5. change current rendered messages' status to "read:true" in db
// 6. dispatch statement goes where?

// click event to load unread messages
document.addEventListener(
    "click",
    (clickEvent) => {
        if (clickEvent.target.id === "readNewMessages") {
            setDisplayMessages()
        }
    }
)

export const DirectMessageList = () => {
    const messages = getDirectMessages()
    const users = getUsers()
    const currentUser = parseInt(localStorage.getItem("gg_user"))

    const userInbox = messages.filter(
        (messageObject) => {
            if (messageObject.recipientId === currentUser && messageObject.read === false) {
                return true
            }
        }
    )
    const renderNewMessages = userInbox.map(
        (messageObject) => {
            return `${getNavBar()} <div class="message--${messageObject.id}></div>
            <div class="message__author">From ${messageObject.senderId}</div>
            <div class="message__text">${messageObject.message}</div>`
                // ***add inside backtick above: ${Footer()}***
        }
    ).join("")
    return renderNewMessages
}