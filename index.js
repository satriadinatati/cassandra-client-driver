const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['3.93.57.132'],
  credentials: { username: 'admin', password: 'admin' },
  localDataCenter: 'dc1',
  keyspace: 'badater'
});

async function start(){

    let select_query = 'SELECT * FROM table_a_mahasiswa';
    await client.execute(select_query,[], {prepare: true}).then(result => {
        result.rows.forEach(row => {
            console.log('name: ', row.nama);
            console.log('nim: ', row.nim, '\n');
        });
    });

    let insert_query = 'INSERT INTO table_a_mahasiswa (nama, nim) VALUES (?, ?)';
    await client.execute(insert_query, ['Rizal', '12345678'], {prepare: true}).then(result => {
        console.log('Data Inserted');
    });

    await client.execute(select_query,[], {prepare: true}).then(result => {
        result.rows.forEach(row => {
            console.log('name: ', row.nama);
            console.log('nim: ', row.nim, '\n');
        });
    });

    let update_query = 'UPDATE table_a_mahasiswa SET nama = ? WHERE nim = ?';
    await client.execute(update_query, ['Rizal Ramadhan', '12345678'], {prepare: true}).then(result => {
        console.log('Data Updated');
    });

    await client.execute(select_query,[], {prepare: true}).then(result => {
        result.rows.forEach(row => {
            console.log('name: ', row.nama);
            console.log('nim: ', row.nim, '\n');
        });
    });


}

start();