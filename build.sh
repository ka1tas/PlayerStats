cd favouriteservice
source ./env-variable.sh
mvn clean package -DskipTests
cd ..
cd userservice
source ./env-variable.sh
mvn clean package -DskipTests
cd ..