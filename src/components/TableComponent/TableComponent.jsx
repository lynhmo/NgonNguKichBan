import React, { useState } from 'react';
import { Table, Button } from 'antd';
import Loading from '../../components/Loading/Loading'


const TableComponent = (props) => {
    const { selectionType = 'checkbox', TableData = [], ColumnData = [], isLoading = false, handleDeleteMany } = props
    const [rowSelectKey, setRowSelectKey] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setRowSelectKey(selectedRowKeys)
        }
    };
    const handleDelete = () => {
        handleDeleteMany(rowSelectKey)

    }
    return (
        <Loading isLoading={isLoading}>
            {rowSelectKey.length > 0 && (
                // <div onClick={handleDelete} style={{}}>Delete Many!!!</div>
                <Button type="primary" danger onClick={handleDelete}>
                    Delete Many!!!
                </Button>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={ColumnData}
                dataSource={TableData}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent