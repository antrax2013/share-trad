export interface Video {
  id :string,
  titre : string,
  url : string,
  datePublication : Date,
  demandeur : string,
  tags : string[],
  transScripts : string[],
  sousTitrages : string[],
  nbVotes : number
}
