import Row from "../Row/Row";
import Column from "../Column/Column";
import Cell from "../Cell/Cell";

function Table(props) {
  return (
    <table>
      <tbody>
        <Row>
          <Column>
            <Cell />
          </Column>
        </Row>

        <Row>
          <Column>
            <Cell />
          </Column>
        </Row>

        <Row>
          <Column>
            <Cell />
          </Column>
        </Row>
      </tbody>
    </table>
  );
}

export default Table;
