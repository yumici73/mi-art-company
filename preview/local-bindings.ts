import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
mkdirSync(resolve('.wrangler/node-preview'),{recursive:true});
const db=new DatabaseSync(resolve('.wrangler/node-preview/database.sqlite'));
db.exec('CREATE TABLE IF NOT EXISTS preview_migrations (name TEXT PRIMARY KEY)');
for(const file of readdirSync(resolve('drizzle')).filter(f=>f.endsWith('.sql')).sort()){if(!db.prepare('SELECT name FROM preview_migrations WHERE name = ?').get(file)){db.exec(readFileSync(resolve('drizzle',file),'utf8'));db.prepare('INSERT INTO preview_migrations (name) VALUES (?)').run(file)}}
function prepare(sql:string){let params:any[]=[];return {bind(...values:any[]){params=values;return this},async all(){return {results:db.prepare(sql).all(...params),success:true}},async first(){return db.prepare(sql).get(...params)||null},async run(){db.prepare(sql).run(...params);return {success:true}}}}
export const env={DB:{prepare,async batch(statements:any[]){return Promise.all(statements.map(s=>s.run()))}},ADMIN_EMAIL:process.env.ADMIN_EMAIL||''};
