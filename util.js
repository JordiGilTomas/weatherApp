import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

export const dir =  resolve(dirname(fileURLToPath(import.meta.url)));

