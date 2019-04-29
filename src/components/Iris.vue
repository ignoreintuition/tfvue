<template>
  <div class="iris">
    <h1>{{ msg }}</h1>
    <h2> Test Data </h2> 
    <table>
        <tr><td>Sepal Length</td><td>Sepal Width</td><td>Petal Length</td><td>Petal Width</td></tr>
        <tr v-for="data in getRawTestData()">
            <td>{{data.sepalLength}}</td>
            <td>{{data.sepalWidth}}</td>
            <td>{{data.petalLength}}</td>
            <td>{{data.petalWidth}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import iris from '../assets/iris.json';
import irisTesting from '../assets/test.json';
export default {
  name: 'Iris',
  props: {
      msg: String,
      trainingData: null,
      outputData: null,
      testingData: null,
  },
    methods: {
        getRawTestData: function(){
            return irisTesting;
        }
    },
    // convert / setup data
  created() {
      this.trainingData = this.$tf.tensor2d(iris.map(item => [
          item.sepalLength, item.sepalWidth, item.petalLength, item.petalWidth,
          ]));
      this.outputData = this.$tf.tensor2d(iris.map(item => [
          item.species === "setosa" ? 1 : 0,
          item.species === "virginica" ? 1 : 0,
          item.species === "versicolor" ? 1 : 0,
          ]));
      this.testingData = this.$tf.tensor2d(irisTesting.map(item => [
          item.sepalLength, item.sepalWidth, item.petalLength, item.petalWidth,
          ]));
      const model = this.$tf.sequential();
      // build the neural network

      model.add(this.$tf.layers.dense({
          inputShape: [4],
          activation: "sigmoid",
          units: 5,
      }))

      model.add(this.$tf.layers.dense({
          inputShape: [5],
          activation: "sigmoid",
          units: 3,
      }))

      model.add(this.$tf.layers.dense({
          activation: "sigmoid",
          units:3 ,
      }))
      model.compile({
          loss: "meanSquaredError",
          optimizer: this.$tf.train.adam(.06), 
      })
      // train/fit data
      const startTime = Date.now()
      model.fit(this.trainingData, this.outputData, {epochs: 100})
      .then((history) => {
          model.predict(this.testingData).print();
      
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3, table {
  margin: 40px 0 0;
}
table {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
