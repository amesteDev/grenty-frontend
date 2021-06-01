<template>
  <div class="about">
    <h1>Vad är grenty?</h1>
    <div class="divider"></div>
    <div class="question-box">
      <h3 class="heading">Behöver du hyra en trägårdsmaskin?</h3>
      <div class="content">
        <p>
          Har du någonsin stått där vid det blivande potatislandet och tänkt vad
          det vore lämpligt med en jordfräs, men det känns inte riktigt
          motiverat att köpa en jordfräs bara för ett potatisland?
        </p>
        <p>
          Det här är appen för dig, här kan du hitta människor i din närhet som
          gärna hyr ut sin röjsåg eller jordfräs, eller till och med kan tänka
          sig att komma och köra den åt dig.
        </p>
      </div>
    </div>

    <div class="question-box">
      <h3 class="blue-heading">
        Nej, det är ju vinter och jag tycker inte om att skota snö?
      </h3>
      <div class="content">
        <p>
          Det här är också appen för dig, under vinterhalvåret har vi helt andra
          behov i Sverige än under sommaren. Kanske hyra en snöslunga? Oavsett
          om det är vinter eller sommar så hittar du det du behöver här.
        </p>
      </div>
    </div>
    <div class="question-box">
      <h3 class="heading">Har du trädgådsmaskiner som bara står?</h3>
      <div class="content">
        <p>
          Varför inte hyra ut dina maskiner till de som behöver en stund. Eller
          till och med erbjud dig att komma med din maskin och göra jobbet mot
          rimlig ersättning.
        </p>
      </div>
    </div>
    <div class="question-box">
      <h3 class="blue-heading">Nej, men en fyrhjuling med snöblad?</h3>
      <div class="content">
        <p>
          Är det vinter och röjsågen står bäst i förrådet tills den kan komma
          till användning igen så är det givetvis fritt fram att erbjuda
          tjänster med snöskottning eller liknande istället.
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" >
.about {
  width: 50%;
  margin: auto;
  @include screen-size(medium-screen) {
    width: 75%;
    margin: auto;
  }
  @include screen-size(small-screen) {
    width: 90%;
    margin: auto;
  }
}

.heading {
  color: rgba(0, 95, 8, 0.829);
}

.blue-heading {
  color: rgba(12, 12, 189, 0.521);
}
</style>