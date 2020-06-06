<?php
    namespace db;
    Interface IDb{
    public function delete($query);
    public function update($query);
    public function insert($query);
    public function select($query);
}