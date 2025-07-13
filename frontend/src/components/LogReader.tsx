'use client';

import { Button, tokens } from '@fluentui/react-components';
import { useEffect, useState } from 'react';

function getLogs() {
  return fetch('/api/log')
    .then(response => response.json())
    .then(data => data.logs)
    .catch(error => {
      console.error('Error fetching logs:', error);
      return [];
    });
}

export default function LogReader() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch logs from the server or read from a file
    getLogs().then(logs => {
      setLogs(logs);
    });
  }, []);

  return (
    <>
      <div style={{
        margin: tokens.spacingVerticalM,
        height: "10vh"
      }}>
        <h1>Log Reader</h1>
        <Button appearance="primary" onClick={() => {
          // Refresh logs
          getLogs().then(logs => {
            setLogs(logs);
          })
        }}>
          Refresh
        </Button>
      </div>
      <div style={{
      }}>
        <pre style={{
          marginTop: tokens.spacingVerticalM,
          marginBottom: tokens.spacingVerticalM,
          marginLeft: tokens.spacingVerticalM,
          overflowY: "scroll",
          height: "90vh"
        }}>
          <p style={{
            fontFamily: "monospace",
          }}>
            {logs.length > 0 ? logs.reverse().join('\n') : 'No logs available.'}
          </p>
        </pre>
      </div>
    </>
);
}