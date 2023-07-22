import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Dropdown, DropdownItem } from "./components/Dropdown";
import {
  Table,
  TableBody,
  TableColumn,
  TableHead,
  TableRow,
  TableRowEmbed,
  TableRowItem,
} from "./components/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Table>
        <TableHead>
          <TableColumn
            transform={(value) => "xxx_" + (value as string) + "_xxx"}
          >
            example
          </TableColumn>
          <TableColumn
            sticky
            transform={(value) => "yyy_" + (value as string) + "_yyy"}
          >
            sticky
          </TableColumn>
          <TableColumn
            summary
            transform={(value) => "zzz_" + (value as string) + "_zzz"}
          >
            summary
          </TableColumn>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableRowItem>example 0</TableRowItem>
            <TableRowItem>sticky 0</TableRowItem>
            <TableRowItem>summary 0</TableRowItem>
          </TableRow>

          <TableRow>
            <TableRowItem>example 1</TableRowItem>
            <TableRowItem>sticky 1</TableRowItem>
            <TableRowItem>summary 1</TableRowItem>
          </TableRow>

          <TableRow>
            <TableRowItem>example 2</TableRowItem>
            <TableRowItem>sticky 2</TableRowItem>
            <TableRowItem>summary 2</TableRowItem>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableColumn
            transform={(value) => "xxx_" + (value as string) + "_xxx"}
          >
            example
          </TableColumn>
          <TableColumn
            sticky
            transform={(value) => "yyy_" + (value as string) + "_yyy"}
          >
            sticky
          </TableColumn>
          <TableColumn
            summary
            transform={(value) => "zzz_" + (value as string) + "_zzz"}
          >
            summary
          </TableColumn>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableRowItem>example 0</TableRowItem>
            <TableRowItem>sticky 0</TableRowItem>
            <TableRowItem>summary 0</TableRowItem>
          </TableRow>

          <TableRow>
            <TableRowItem>example 1</TableRowItem>
            <TableRowItem>sticky 1</TableRowItem>
            <TableRowItem>summary 1</TableRowItem>
          </TableRow>

          <TableRow>
            <TableRowItem>example 2</TableRowItem>
            <TableRowItem>sticky 2</TableRowItem>
            <TableRowItem>summary 2</TableRowItem>
            <TableRowEmbed>lol</TableRowEmbed>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default App;

//
