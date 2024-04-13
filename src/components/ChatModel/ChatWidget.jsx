import { useState } from "react";
import ModalWindow from "./ModelChat";
import { FloatButton } from 'antd';
import {WechatOutlined} from "@ant-design/icons";
function ChatWidget() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <FloatButton
                onClick={() => setOpen(!open)}
                icon={<WechatOutlined />}
                description={"AI"}
            >
            </FloatButton>
            <ModalWindow  open={open} />
        </div>
    );
}


export default ChatWidget;