import React, { useState } from "react";
import { Table, Input } from "antd";
import "./TablaDescargas.css";

const TablaDescargas = ({ data, columnas, showIndex = true }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data); 

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const finalColumns = showIndex
    ? [
        {
          title: "Nro.",
          key: "nro",
          render: (_, record, index) => <b>{index + 1}</b>,
        },
        ...columnas.map((col) => ({
          ...col,
          sorter: (a, b) => {
            if (typeof a[col.dataIndex] === "string") {
              return a[col.dataIndex].localeCompare(b[col.dataIndex]);
            }
            return a[col.dataIndex] - b[col.dataIndex];
          },
          sortDirections: ["ascend", "descend"],
        })),
      ]
    : columnas.map((col) => ({
        ...col,
        sorter: (a, b) => {
          if (typeof a[col.dataIndex] === "string") {
            return a[col.dataIndex].localeCompare(b[col.dataIndex]);
          }
          return a[col.dataIndex] - b[col.dataIndex];
        },
        sortDirections: ["ascend", "descend"],
      }));

  return (
    <div className="table-responsive">
      <Input
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={finalColumns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TablaDescargas;