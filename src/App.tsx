import { Dropdown, DropdownItem } from "./components/Dropdown";
import {
  Table,
  TableBody,
  TableColumn,
  TableHead,
  TableRow,
  TableRowItem,
} from "./components/Table";
import { TabItem, Tabs } from "./components/Tabs";

function App() {
  return (
    <>
      <Tabs>
        <TabItem label="None">nice</TabItem>
        <TabItem label="Dropdown">
          <Dropdown label="Example">
            <DropdownItem value="Pikachu">Pikachu</DropdownItem>
            <DropdownItem value="Dragonite">Dragonite</DropdownItem>
            <DropdownItem value="Articuno">Articuno</DropdownItem>
            <DropdownItem value="Entei">Entei</DropdownItem>
          </Dropdown>
        </TabItem>
        <TabItem label="Table">
          <Table>
            <TableHead>
              <TableColumn
                transform={(value: string) => "xxx_" + value + "_xxx"}
              >
                example
              </TableColumn>
              <TableColumn
                sticky
                transform={(value) => "yyy_" + (value as string) + "_yyy"}
              >
                sticky
              </TableColumn>
              <TableColumn summary>summary</TableColumn>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableRowItem>test</TableRowItem>
                <TableRowItem>sticky 0</TableRowItem>
                <TableRowItem>summary 0</TableRowItem>
              </TableRow>

              <TableRow>
                <TableRowItem>test</TableRowItem>
                <TableRowItem>sticky 1</TableRowItem>
                <TableRowItem>summary 1</TableRowItem>
              </TableRow>

              <TableRow>
                <TableRowItem>test</TableRowItem>
                <TableRowItem>sticky 2</TableRowItem>
                <TableRowItem>summary 2</TableRowItem>
              </TableRow>
            </TableBody>
          </Table>
        </TabItem>
      </Tabs>
    </>
  );
}

export default App;
