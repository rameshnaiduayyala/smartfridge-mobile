import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

interface Column {
    id: string;
    header: string;
    accessorKey?: string; 
  }
  

interface ISmartFridgeDataTableProps {
  data: any[];
  columns: Column[];
  totalRows: number;
  hidePagination?: boolean;
  noDataMessage?: string;
  pageSize?: number;
  pageIndex?: number;
}

const SmartFridgeDataTable: React.FC<ISmartFridgeDataTableProps> = ({
  data,
  columns,
  totalRows,
  hidePagination = false,
  noDataMessage = "There is no data",
  pageSize = 5,
  pageIndex = 0,
}) => {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean } | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(pageIndex);

  const sortedData = useMemo(() => {
    if (!sorting) return data;
    return [...data].sort((a, b) => {
      if (a[sorting.id] < b[sorting.id]) return sorting.desc ? 1 : -1;
      if (a[sorting.id] > b[sorting.id]) return sorting.desc ? -1 : 1;
      return 0;
    });
  }, [data, sorting]);

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <View style={styles.tableContainer}>
      <View style={styles.headerRow}>
        {columns.map((column) => (
          <TouchableOpacity
            key={column.id}
            style={styles.headerCell}
            onPress={() => {
              setSorting((prev) =>
                prev?.id === column.id && !prev.desc
                  ? { id: column.id, desc: true }
                  : { id: column.id, desc: false }
              );
            }}
          >
            <Text style={styles.headerText}>{column.header}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={paginatedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {columns.map((column) => (
              <Text key={column.id} style={styles.cell}>
                {item[column.id]}
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noDataText}>{noDataMessage}</Text>
        )}
      />

      {!hidePagination && totalRows > pageSize && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            style={styles.pageButton}
          >
            <IoChevronBackOutline size={20} />
          </TouchableOpacity>
          <Text style={styles.pageNumber}>{currentPage + 1}</Text>
          <TouchableOpacity
            onPress={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(totalRows / pageSize) - 1 ? prev + 1 : prev
              )
            }
            disabled={currentPage >= Math.ceil(totalRows / pageSize) - 1}
            style={styles.pageButton}
          >
            <IoChevronForward size={20} />
          </TouchableOpacity>
          <Text>
            Page {currentPage + 1} of {Math.ceil(totalRows / pageSize)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  headerCell: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 10,
    color: "#999",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  pageNumber: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SmartFridgeDataTable;