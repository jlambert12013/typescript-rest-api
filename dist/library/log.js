"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class log {
}
// Success
log.success = (args) => console.log('\x1b[36m%s\x1b[0m', `${new Date().toLocaleString()} [INFO]`, typeof args === 'string' ? args : args);
// Warning
log.warning = (args) => console.log('\x1b[33m%s\x1b[0m', `${new Date().toLocaleString()} [INFO]`, typeof args === 'string' ? args : args);
// Error
log.error = (args) => console.log('\x1b[31m', `${new Date().toLocaleString()} [INFO]`, typeof args === 'string' ? args : args);
exports.default = log;
