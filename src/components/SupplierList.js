import React, { useEffect, useMemo, useRef, useState } from "react";

import SupplierDataService from "../services/SupplierService";
import { useTable } from "react-table";

const SuppliersList = (props) => {
  const [Suppliers, setSuppliers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const SuppliersRef = useRef();

  SuppliersRef.current = Suppliers;

  useEffect(() => {
    retrieveSuppliers();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSuppliers = () => {
    SupplierDataService.getAll()
      .then((response) => {
        console.log(response);
        setSuppliers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSuppliers();
  };

  const removeAllSuppliers = () => {
    SupplierDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    SupplierDataService.findByTitle(searchTitle)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openSupplier = (rowIndex) => {
    const id = SuppliersRef.current[rowIndex].id;

    props.history.push("/supplier/" + id);
  };

  const deleteSupplier = (rowIndex) => {
    const id = SuppliersRef.current[rowIndex].id;

    SupplierDataService.remove(id)
      .then((response) => {
        props.history.push("/supplier");

        let newSuppliers = [...SuppliersRef.current];
        newSuppliers.splice(rowIndex, 1);

        setSuppliers(newSuppliers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "email",
        accessor: "email",
        
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openSupplier(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteSupplier(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: Suppliers,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllSuppliers}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default SuppliersList;
