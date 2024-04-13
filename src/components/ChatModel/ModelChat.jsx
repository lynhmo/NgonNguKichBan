import { useEffect, useRef, useState } from "react";
import CodeResponse from "./CodeResponse";
import ReactMarkdown from "react-markdown";
import {  Drawer } from 'antd';
import { Button,Input } from 'antd';
import * as ChatAI from '../../services/ChatAI'



const { TextArea } = Input;
const ModalWindow = (props) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const textareaRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setOpen(props.open)
    },[props])
    const onClose = () => {
        setOpen(false);
    };
    const clear = () => {
        setChatHistory([]);
        setValue("");
        setError("");
        textareaRef.current.style.height = "auto";
    };


    const getResponse = async () => {

        if (!value) {
            setError("Please enter a question");
            return;
        }
        try {
            setIsLoading(true);
            const options = {
                method: "POST",
                body: JSON.stringify({
                    history: chatHistory,
                    message: value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await ChatAI.ChatPromt(options.body, options.headers);
            const data = await response;

            let formattedResponse = "";

            if (data.startsWith("**")) {
                formattedResponse = data;
            } else {
                formattedResponse = `**Trợ lý ảo:** ${data}`;
            }

            const formattedUserMessage = `**Bạn:** ${value}`;

            setChatHistory((oldChatHistory) => [
                ...oldChatHistory,
                {
                    role: "user",
                    parts: formattedUserMessage,
                },
                {
                    role: "model",
                    parts: formattedResponse,
                },
            ]);

            setValue("");
            setError("");
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false); // Set loading state back to false after the API call completes
        }
    };

    // returning display
    return (
        <Drawer onClose={onClose} open={open}>
            <div>
                <h4>Chat Bot AI</h4>
                <div style={{display:"flex", flexDirection:'column'}}>
                    <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Chat..."
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                getResponse();
                            }
                        }}
                    />

                    {!error && !isLoading &&
                        <Button style={{background: '#72af5c',color: 'white'}} onClick={getResponse}>
                            Search
                        </Button>}

                    {error && !isLoading &&
                        <Button style={{background: '#72af5c',color: 'white'}} onClick={clear}>
                            Clear
                        </Button>}

                    {isLoading &&
                        <Button style={{background: '#72af5c',color: 'white'}} loading>
                            Generate...
                        </Button>}
                </div>

                {error && <p className="error">{error}</p>}
                <div className="search-result" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {chatHistory.map((chatItem, index) => (
                        <div key={index}>
                            <div className="message">
                                {chatItem.role === "user" ? (
                                    <div className="user-message">
                                        <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                                    </div>
                                ) : chatItem.parts.startsWith("```") ? (
                                    <CodeResponse code={chatItem.parts} />
                                ) : (
                                    <div className="bot-message">
                                        <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                            {index !== chatHistory.length - 1 && <div className="message-gap" />}
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
}
export default ModalWindow;