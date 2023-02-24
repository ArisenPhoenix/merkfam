exports.getDate = function(){
  const options = {weekday: "long", day: "numeric", month: "long"}
  const today = new Date();
  const date = today.toLocaleDateString("en-US", options);
  let date_state = []
  let word = ""
  for (let i=0; i<date.length+1; i++){
    if (date[i] === "," || date[i] === " "){
      if (word !== ""){
      date_state.push(word)
    }
      // console.log(word)
      word = ""
    } else if (i === date.length){
      date_state.push(word)
    }
    else {
    word += date[i]
    // console.log(word)
  }

  }
  // console.log(date_state)
  return date_state
}

exports.getDay = function(){
  const dayString = new Date().toLocaleString('en-us', {weekday: 'long'});
  return dayString
}
