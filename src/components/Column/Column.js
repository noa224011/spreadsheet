import "./Column.css";

function Column(props) {
  return <td className={"column"}>{props.children}</td>;
}

export default Column;
