<?php
    namespace db;
    require_once __DIR__ . "./../env.php";
    require_once "IDb.php";

    use db\DbConfig as Cfg;

    class DbHandler implements IDb{

        public $connection;

        public function connectDb(){
            $this ->connection = new \mysqli(
                Cfg::HOST,
                Cfg::USER,
                Cfg::PASS,
                Cfg::DB
            );

            if($this->connection->connect_errno){
                echo "Couldn't connect to db {$this->connection->connect_errno}";
            }
        }

        public function disconnectDb(){
            $this->connection->close();
        }

        public function insert($query){
            $this->connectDb();

            $sql = $this->connection->query($query);

            if(!$sql){
                echo "Query Failed";
            }

            $this->disconnectDb();
        }

        public function select($query){

            $this->connectDb();

            $sql = $this->connection->query($query);

            if(!$sql){
                echo "Query Failed";
            }

            $this->disconnectDb();

            return $sql;
        }

        public function delete($query){
            $this->connectDb();

            $sql = $this->connection->query($query);
    
            if (!$sql) {
                echo "Query fail";
            }
    
            $this->disconnectDb();
        }

        public function update($query){
            $this->connectDb();

            $sql = $this->connection->query($query);
    
            if (!$sql) {
                echo "Query fail";
            }
    
            $this->disconnectDb();
        }
    }
