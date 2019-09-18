module.exports = (client, oldmsg, newmsg) => {
  return;
  if(newmsg.content.match("(http|ftp|https)://([\w-]+(?:(?:.[\w-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?").length > 0) {
    client.emit("link", newmsg);
  }
}
