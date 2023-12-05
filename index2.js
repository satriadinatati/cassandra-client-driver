const cassandra = require('cassandra-driver');
const express = require('express');
const app = express();
app.use(express.json());


const client = new cassandra.Client({
  contactPoints: ['3.89.25.27', '35.173.137.197'],
  credentials: { username: 'admin', password: 'admin' },
  localDataCenter: 'dc1',
  keyspace: 'badater'
});

async function select(){
    let select_query = 'SELECT * FROM table_a_mahasiswa';
    const result = await client.execute(select_query,[], {prepare: true}).catch(err => {
        console.log(err);
    });
    return result.rows;
}

async function select_where(nama){
    let select_query = 'SELECT * FROM table_a_mahasiswa WHERE nama = ?';
    const result = await client.execute(select_query,[nama], {prepare: true}).catch(err => {
        console.log(err);
    });
    return result.rows;
}

async function insert(nama, nim){
    let insert_query = 'INSERT INTO table_a_mahasiswa (nama, nim) VALUES (?, ?)';
    await client.execute(insert_query, [nama, nim], {prepare: true}).then(result => {
        console.log('Data Inserted');
    }).catch(err => {
        console.log(err);
    });
}

async function delete_data(nim){
    let delete_query = 'DELETE FROM table_a_mahasiswa WHERE nim = ?';
    await client.execute(delete_query, [nim], {prepare: true}).then(result => {
        console.log('Data Deleted');
    }).catch(err => {
        console.log(err);
    });
}

async function update(nama, nim){
    let update_query = 'UPDATE table_a_mahasiswa SET nama = ? WHERE nim = ?';
    await client.execute(update_query, [nama, nim], {prepare: true}).then(result => {
        console.log('Data Updated');
    }).catch(err => {
        console.log(err);
    });
}

app.get('/', async (req, res) => {
    const result = await select();
    console.log(result);
    res.json(result);
});

app.get('/where/:nim', async (req, res) => {
    const result = await select_where(req.params.nim);
    console.log(result);
    res.json(result);
});

app.post('/', async (req, res) => {
    const {nama, nim} = req.body;
    await insert(nama, nim);
    res.json({nama, nim});
});

app.delete('/', async (req, res) => {
    const {nim} = req.body;
    await delete_data(nim);
    res.json({nim});
});

app.put('/', async (req, res) => {
    const {nim, nama} = req.body;
    await update(nama, nim);
    res.json({nama, nim});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});