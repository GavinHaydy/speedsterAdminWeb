import type { ReactNode } from 'react';

import type { TableProps } from 'antd';
import { Card, Space, Table } from 'antd';

export interface CrudTableProps<T extends object> {
  /**
   * 搜索区域
   */
  search?: ReactNode;

  /**
   * 功能区
   */
  actions?: ReactNode;

  /**
   * Table 数据
   */
  dataSource?: T[];

  /**
   * Table 列
   */
  columns: TableProps<T>['columns'];

  /**
   * 行 Key
   */
  rowKey?: TableProps<T>['rowKey'];

  /**
   * 加载状态
   */
  loading?: boolean;

  /**
   * 分页
   */
  pagination?: TableProps<T>['pagination'];

  /**
   * 行选择
   */
  rowSelection?: TableProps<T>['rowSelection'];

  /**
   * Table 其他属性
   */
  tableProps?: Omit<
    TableProps<T>,
    'dataSource' | 'columns' | 'rowKey' | 'loading' | 'pagination' | 'rowSelection'
  >;
}

export default function CrudTable<T extends object>({
  search,
  actions,
  dataSource,
  columns,
  rowKey = 'id',
  loading = false,
  pagination,
  rowSelection,
  tableProps,
}: CrudTableProps<T>) {
  return (
    <>
      {/* 搜索区域 */}
      {search && <Card>{search}</Card>}

      {/* 功能区 + Table */}
      <Card
        style={{
          marginTop: search ? 16 : 0,
        }}
      >
        {/* 功能区 */}
        {actions && <Space style={{ marginBottom: 16 }}>{actions}</Space>}

        {/* Table */}
        <Table<T>
          {...tableProps}
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={pagination}
          rowSelection={rowSelection}
        />
      </Card>
    </>
  );
}
