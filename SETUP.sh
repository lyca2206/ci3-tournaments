source .env

docker compose up -d;

PSQL_CONTAINER=$(docker ps | grep ci3-tournaments-db-1 | grep -o '^[^ ]*') &&

until docker exec $PSQL_CONTAINER psql -h $DB_HOST -U postgres -c '\q'; do
    sleep 2;
done

docker exec $PSQL_CONTAINER psql -U postgres -c "CREATE USER $DB_USERNAME WITH SUPERUSER PASSWORD '$DB_PASSWORD';" &&
docker exec $PSQL_CONTAINER psql -U postgres -c "CREATE DATABASE $DB_NAME;"