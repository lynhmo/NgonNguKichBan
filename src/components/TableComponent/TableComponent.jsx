import React from 'react';
import { Table } from 'antd';
import Loading from '../../components/Loading/Loading'


const TableComponent = (props) => {
    const { selectionType = 'checkbox', TableData = [], ColumnData = [], isLoading = false } = props

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <Loading isLoading={isLoading}>

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