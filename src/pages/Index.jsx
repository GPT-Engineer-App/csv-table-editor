import React, { useState } from "react";
import { Container, VStack, Text, Button, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { CSVReader, CSVDownloader } from "react-papaparse";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  
  const handleUpload = (data) => {
    setCsvData(data);
  };

  const handleEdit = (rowIndex, columnIndex, value) => {
    const updatedData = [...csvData];
    updatedData[rowIndex][columnIndex] = value;
    setCsvData(updatedData);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">CSV Upload and Edit Tool</Text>
        <CSVReader onUploadAccepted={(results) => handleUpload(results.data)}>
          {({ getRootProps, acceptedFile, ProgressBar }) => (
            <>
              <Button {...getRootProps()} colorScheme="teal">
                Upload CSV
              </Button>
              {acceptedFile && <Text>{acceptedFile.name}</Text>}
              <ProgressBar />
            </>
          )}
        </CSVReader>
        {csvData.length > 0 && (
          <>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {csvData[0].map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {csvData.slice(1).map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <Td key={columnIndex}>
                        <Input
                          value={cell}
                          onChange={(e) => handleEdit(rowIndex + 1, columnIndex, e.target.value)}
                        />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <CSVDownloader
              data={csvData}
              filename={"edited_csv"}
              bom={true}
            >
              <Button colorScheme="teal">Download Edited CSV</Button>
            </CSVDownloader>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;