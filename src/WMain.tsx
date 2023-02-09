import { Drawer } from "antd";
import React, { useRef, useState } from "react";
import { extractWords, getAllTextNodes, segment } from "./Dom";
import WHeader from "./WHeader";
import WList from "./WList";
import $ from "jquery";

const WMain = () => {
  const [mask, setMask] = useState(true);
  const [open, setOpen] = useState(true);
  const cond = { fav: "0", tag: "-1", order: "-1" };
  const wlist: any = useRef();
  const handlerCondChange = (cond) => {
    wlist.current.filter(cond);
  };

  const handlerMaskChange = (mask) => {
    setMask(mask);
  };

  const ws = extractWords();
  if (ws.length < 20) {
    return;
  }

  const handlerWordListLoaded = (words) => {
    console.log("handlerWordListLoaded");
    words = words.filter((word) => word.fav === "0");
    const w2words = new Map(words.map((w) => [w.word, w]));
    const nodes = getAllTextNodes();
    for (let node of nodes) {
      const tokens = segment(node.nodeValue);

      const html = [];
      for (let token of tokens) {
        if (w2words.has(token.toLowerCase())) {
          html.push(`<en>${token}</en>`);
        } else {
          html.push(token);
        }
      }
      $(node).replaceWith(html.join(""));
    }
    $("en").css("border-bottom", "1px dashed");
  };

  return (
    <Drawer
      width={400}
      closable={true}
      title={
        <WHeader
          cond={cond}
          onCondChange={handlerCondChange}
          onMaskChange={handlerMaskChange}
        />
      }
      placement="right"
      open={open}
      onClose={() => setOpen(!open)}
      mask={false}
    >
      <WList
        ref={wlist}
        cond={cond}
        ws={ws}
        mask={mask}
        onWordListLoaded={handlerWordListLoaded}
      />
    </Drawer>
  );
};

export default WMain;
