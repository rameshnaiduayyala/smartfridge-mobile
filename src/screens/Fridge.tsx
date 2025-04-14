import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import SmartFridgeModal from '../components/SmartFridgeMobileModal/SmartFridgeMobileModal'
import SmartFridgeDataTable from '../components/SmartFridgeMobileDataTable'
import { ColumnDef } from '@tanstack/react-table';

interface CustomColumnMeta {
  sortable?: boolean;
  className?: string;
}

type CustomColumnDef<TData> = ColumnDef<TData, any> & {
  meta?: CustomColumnMeta;
  id: string;
};

const Fridge = () => {
  const [showModal, setShowModal] = useState(false)
  const userData: CustomColumnDef<any>[] = [
    {
      id: 'name', // Explicitly set an ID
      accessorKey: 'name',
      cell: ({ row }) => {
        return <a style={{ cursor: 'pointer', color: 'blue' }}>{row?.original?.name}</a>;
      },
      header: () => 'Camera Name',
      meta: { className: 'left' },
      filterFn: 'includesString',
    },
    {
      id: 'serialNumber', // Explicitly set an ID
      accessorKey: 'serialNumber',
      cell: ({ row }) => {
        return <Text>{row?.original?.serialNumber}</Text>;
      },
      header: () => 'Serial Number',
      meta: { className: 'left' },
    },
    {
      id: 'model', // Explicitly set an ID
      accessorKey: 'model',
      cell: ({ row }) => {
        return <Text>{row?.original?.model}</Text>;
      },
      header: () => 'Model',
      meta: { className: 'left' },
    },
    {
      id: 'fridgeId', // Explicitly set an ID
      accessorKey: 'fridgeId',
      cell: ({ row }) => {
        return <Text>{row?.original?.fridge?.name || '-'}</Text>;
      },
      header: () => 'Fridge Name',
      meta: { className: 'left' },
    },
    {
      id: 'url', // Explicitly set an ID
      accessorKey: 'url',
      cell: ({ row }) => {
        return <a
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}
          href={row?.original?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text>{row?.original?.url}</Text>
        </a>;
      },
      header: () => 'URL',
      meta: { className: 'center' },
    },
    {
      id: 'status', // Explicitly set an ID
      accessorKey: 'status',
      cell: ({ row }) => {
        return <Text>{row?.original?.status === true ? 'Active' : 'Inactive'}</Text>;
      },
      header: () => 'Status',
      meta: { className: 'left' },
    },
  ];

  return (
    <View>
      <Text>Fridge</Text>
      <Button title="Open Modal" onPress={() => setShowModal(true)} />
      <SmartFridgeDataTable data={[]} columns={userData as any[]} totalRows={0} />
      <SmartFridgeModal show={showModal} onClose={() => setShowModal(false)} modalBodyComponent={<Text>Modal Body</Text>} />
    </View>
  )
}

export default Fridge