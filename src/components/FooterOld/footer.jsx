export const Footer = (props) => {
    console.log("props", props);
    return (
    <div>
        {props.arr.map((el) => (
            <li>{el.name}</li>
        ))}
        </div>
    );
};