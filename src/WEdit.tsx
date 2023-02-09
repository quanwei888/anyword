import React from "react";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  StarTwoTone,
  StarOutlined
} from "@ant-design/icons";
import { Typography, Dropdown, Space, Button } from "antd";

const items = [
  {
    key: "0",
    label: "不认识"
  },
  {
    key: "1",
    label: "模糊"
  },
  {
    key: "2",
    label: "认识"
  }
];

const WEdit = (props) => {
  //console.log("----WListItem Load----");
  const { tag, fav } = props.item;
  const item = props.item;
  const onTagChanged = ({ key }) => {
    return (
      props.onChange &&
      props.onChange({ word: props.item.word, tag: key, fav: fav })
    );
  };
  const onFavChanged = () => {
    const newFav = fav === "0" ? "1" : "0";
    return (
      props.onChange &&
      props.onChange({ word: props.item.word, tag: tag, fav: newFav })
    );
  };
  const onDoneChanged = () => {
    return (
      props.onChange &&
      props.onChange({ word: props.item.word, tag: "2", fav: "1" })
    );
  };

  return (
    <Space size={5}>
      <Dropdown
        menu={{
          items,
          onClick: onTagChanged,
          selectable: true,
          defaultSelectedKeys: [String(item.tag)]
        }}
      >
        <Typography.Text>
          {item.tag === "0" && <CheckCircleOutlined />}
          {item.tag === "1" && <CheckCircleTwoTone twoToneColor="#eb2f96" />}
          {item.tag === "2" && <CheckCircleTwoTone twoToneColor="#52c41a" />}
        </Typography.Text>
      </Dropdown>
      <Typography.Text onClick={(e) => e.preventDefault()}>
        <span onClick={onFavChanged}>
          {item.fav === "0" && <StarOutlined />}
          {item.fav === "1" && <StarTwoTone twoToneColor="#52c41a" />}
        </span>
      </Typography.Text>
      <Typography.Text>
        <span onClick={onDoneChanged}>
          {item.tag === "2" && item.fav === "1" ? (
            <Button size="small" disabled>
              斩
            </Button>
          ) : (
            <Button size="small">斩</Button>
          )}
        </span>
      </Typography.Text>
    </Space>
  );
};

export default WEdit;
