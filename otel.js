const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');

const traceExporter = new OTLPTraceExporter({
  url: 'https://api.datadoghq.com/api/v2/apm/traces',
  headers: {
    'DD-API-KEY': process.env.DD_API_KEY
  }
});

const metricExporter = new OTLPMetricExporter({
  url: 'https://api.datadoghq.com/api/v2/apm/metrics',
  headers: {
    'DD-API-KEY': process.env.DD_API_KEY
  }
});

const sdk = new NodeSDK({
  traceExporter,
  metricExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();