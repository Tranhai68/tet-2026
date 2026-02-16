// ========================================
// DATA LAYER — Lời chúc Tết & Settings
// ========================================

const DEFAULT_WISHES = [
    // === PHẦN 1: BÌNH AN & TÂM HỒN THANH TỊNH ===
    "Cầu mong năm mới tâm hồn tĩnh tại như mặt hồ thu, mọi lo toan hóa thành mây khói, chỉ còn lại những khoảnh khắc an nhiên thưởng trà, ngắm hoa nở giữa đời thường.",
    "Chúc cho những ngày tháng tới, nắng chỉ vương nhẹ trên vai, mưa không làm ướt lối về, và lòng người lúc nào cũng ấm áp, bao dung như bếp lửa hồng đêm đông.",
    "Năm rộng tháng dài, mong gác lại mọi âu lo của ngày cũ, để mỗi sáng mai thức dậy đều thấy lòng mình nhẹ tênh, đời bình yên tựa một khúc ca dao ngọt ngào.",
    "Nguyện cầu cho mưa thuận gió hòa ngay trong tâm khảm. Để dẫu ngoài kia có biến động thế nào, lòng vẫn vững chãi như núi, tĩnh lặng như sông, soi chiếu được mọi niềm vui.",
    "Năm mới, không cầu giàu sang phú quý, chỉ mong thân tâm an lạc. Đêm ngủ ngon giấc, ngày cười hiền hòa, chuyện đời vinh nhục xem nhẹ tựa gió thoảng mây bay bên thềm.",
    "Chúc cho dòng thời gian năm nay trôi qua thật dịu dàng. Đủ chậm để cảm nhận hạnh phúc, đủ nhanh để lướt qua nỗi buồn, và đủ sâu sắc để trân trọng từng phút giây hiện tại.",
    "Mong rằng năm nay, mọi vết thương lòng đều được thời gian chữa lành thành sẹo đẹp, để tâm hồn lại được ươm mầm những hạt giống của niềm tin và sự thanh thản tuyệt đối.",
    "Xuân sang, chúc bạn có một tâm hồn rộng mở như bầu trời, dung chứa được mọi điều hay dở của nhân gian mà vẫn giữ được sự trong trẻo, thuần khiết như sương mai.",
    "Chúc năm mới sống đơn giản mà thanh cao. Ăn một món ngon, đọc một cuốn sách hay, gặp một người tri kỷ, thấy cuộc đời này đáng sống và đáng yêu biết bao nhiêu.",
    "Cầu cho vạn sự tùy duyên mà an bài, nhưng mong duyên nào đến cũng là duyên lành, phận nào cũng là phúc phận, để mỗi ngày trôi qua đều là một ngày nắng đẹp.",
    "Mong năm nay bạn sẽ tìm thấy sự bình yên ngay trong những điều nhỏ bé nhất: Một tách trà nóng, một trang sách mở dở, và nụ cười hiền hậu của những người thân yêu.",
    "Chúc cho mọi giông bão đều dừng sau cánh cửa nhà, để bên trong chỉ còn lại tiếng cười nói rộn ràng, sự sum vầy ấm áp và những cái nắm tay thật chặt.",
    "Năm mới, chúc bạn học được cách buông bỏ những muộn phiền không đáng có, chỉ giữ lại những ký ức đẹp đẽ để làm hành trang bước tiếp trên con đường ngập tràn hoa cỏ.",
    "Cầu chúc một năm \"Thân khỏe - Tâm an - Trí sáng\". Sống vui vẻ như chim trời, tự do như gió ngàn, và kiên định như tùng bách giữa đất trời bao la rộng lớn.",
    "Mong rằng mỗi bước chân bạn đi trong năm mới đều nhẹ nhàng như lướt trên cỏ mềm, mỗi con đường bạn chọn đều dẫn lối về phía ánh sáng của sự bình an và hạnh phúc.",
    "Chúc bạn năm mới có đủ thời gian để chăm sóc khu vườn tâm hồn mình, nhổ bỏ cỏ dại ưu phiền, gieo trồng hoa thơm trái ngọt của lòng biết ơn và sự tử tế.",
    "Gửi niệm lành cho năm mới: Mong khổ đau lùi xa, hạnh phúc ghé lại. Sống mỗi ngày trọn vẹn nghĩa tình, để đêm về không còn trăn trở, sáng ra đón nắng với nụ cười.",
    "Chúc cho năm nay, dù thế giới bên ngoài có ồn ào đến đâu, bạn vẫn giữ được một khoảng lặng bình yên trong tim để lắng nghe và thấu hiểu chính bản thân mình.",
    "Năm mới, mong bạn như dòng nước chảy, gặp đá thì mềm mại uốn quanh, gặp vực thì mạnh mẽ tuôn trào, luôn linh hoạt và an nhiên trước mọi biến cố của cuộc đời.",
    "Cầu chúc cho những người tôi trân quý một năm an lành. Đi xa bình an, về gần hạnh phúc, vạn sự hanh thông, tâm hồn lúc nào cũng phơi phới sắc xuân thì.",

    // === PHẦN 2: TÀI LỘC & CÔNG DANH RỰC RỠ ===
    "Năm mới, chúc chí lớn gặp gió đông, tài năng gặp thời vận. Như cá chép hóa rồng, một lần quẫy đuôi là vươn ra biển lớn, công thành danh toại, vạn sự hanh thông.",
    "Chúc cho những nỗ lực thầm lặng của bạn suốt thời gian qua sẽ được đền đáp bằng một vụ mùa bội thu, tiền tài rủng rỉnh, sự nghiệp thăng hoa như diều gặp gió.",
    "Mong năm nay công việc thuận buồm xuôi gió, ký đâu thắng đó. Khó khăn hóa thành cơ hội, thử thách biến thành bàn đạp để vươn tới những đỉnh cao mới của thành công.",
    "Chúc bạn năm mới bản lĩnh như tùng bách, khôn khéo như nước chảy. Kinh doanh đắc lộc, làm ăn phát tài, tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.",
    "Năm cũ khép lại, chúc bạn mở ra chương mới rực rỡ hơn. Sự nghiệp vững chắc như kiềng ba chân, tài lộc dồi dào như mưa rào mùa hạ, danh tiếng vang xa vạn dặm.",
    "Cầu cho năm nay \"Mã đáo thành công\". Những dự định ấp ủ bấy lâu sẽ đơm hoa kết trái, mang lại thành quả ngọt ngào xứng đáng với mồ hôi công sức đã bỏ ra.",
    "Chúc bạn một năm \"Đắc tài, đắc lộc, đắc nhân tâm\". Vừa giàu có về vật chất, vừa giàu có về tình người, được đối tác tin cậy, đồng nghiệp yêu mến, cấp trên trọng dụng.",
    "Mong rằng năm mới, ví tiền của bạn lúc nào cũng dày, nhưng tâm hồn vẫn thảnh thơi. Làm giàu không vất vả, hưởng thụ không lo âu, phú quý đi đôi với an nhàn.",
    "Chúc con đường công danh năm nay được trải thảm đỏ. Bước chân đến đâu, may mắn nở hoa đến đó. Mọi cánh cửa cơ hội đều rộng mở chào đón bạn bước vào vinh quang.",
    "Năm mới, chúc tư duy sắc bén như dao, tầm nhìn rộng mở như biển. Quyết đoán trong mọi lựa chọn, thành công trong mọi giao dịch, đưa sự nghiệp lên một tầm cao mới.",
    "Cầu cho Thần Tài gõ cửa, Thần May Mắn ghé thăm. Năm nay làm một hưởng mười, làm chơi ăn thật, tiền bạc dư dả để chăm lo cho bản thân và gia đình sung túc.",
    "Chúc bạn năm mới sở hữu nguồn năng lượng dồi dào để chinh phục mọi mục tiêu. Biến những điều không thể thành có thể, biến những giấc mơ xa vời thành hiện thực trong tầm tay.",
    "Mong năm nay sự nghiệp của bạn sẽ tỏa sáng như sao Bắc Đẩu, dẫn lối cho thành công. Dù thương trường như chiến trường, bạn vẫn luôn là người chiến thắng với nụ cười trên môi.",
    "Chúc một năm \"Vạn sự khởi đầu nan, gian nan không nản\". Càng thử thách, càng tôi luyện được bản lĩnh thép, để cuối cùng gặt hái được những thành quả huy hoàng nhất.",
    "Năm mới, chúc bạn xây dựng được những mối quan hệ vàng, hợp tác cùng phát triển. Buôn may bán đắt, một vốn bốn lời, tiền tài ùn ùn kéo đến chật két, vui vẻ cả năm.",
    "Cầu chúc cho công việc năm nay trôi chảy như thơ, lợi nhuận tăng trưởng như nhạc. Mỗi ngày đi làm là một ngày vui, mỗi dự án đều là một tác phẩm nghệ thuật thành công.",
    "Chúc bạn năm mới \"Tấn tài tấn lộc\". Sự nghiệp thăng tiến không ngừng nghỉ, vị thế ngày càng vững chắc, trở thành chỗ dựa vững chãi cho gia đình và là niềm tự hào của dòng họ.",
    "Mong rằng năm nay, những ý tưởng sáng tạo của bạn sẽ được chắp cánh bay cao. Đột phá trong tư duy, ngoạn mục trong hành động, và rực rỡ trong kết quả đạt được.",
    "Chúc năm mới tiền đầy túi, tim đầy tình, xăng đầy bình, gạo đầy lu, muối đầy hũ, vàng đầy tủ, sức khỏe đầy đủ, và hạnh phúc thì không bao giờ vơi cạn.",
    "Năm mới, chúc bạn nắm bắt được thiên thời, địa lợi, nhân hòa. Để mọi kế hoạch kinh doanh đều thuận lợi, mọi đầu tư đều sinh lời, mang lại sự thịnh vượng bền vững lâu dài.",

    // === PHẦN 3: HẠNH PHÚC & TÌNH CẢM TRÒN ĐẦY ===
    "Chúc người thương năm tháng dịu dàng. Đi đâu cũng có người chờ, về đâu cũng có người đợi. Bão dừng sau cánh cửa, chỉ còn lại tình yêu và sự ấm áp ngập tràn trong ngôi nhà nhỏ.",
    "Năm mới, mong tình cảm gia đình mình như rượu ủ lâu năm. Càng thêm ngày thêm tháng, lại càng nồng nàn, thấu hiểu và trân trọng nhau hơn qua bao thăng trầm của cuộc sống.",
    "Chúc cho những trái tim cô đơn năm nay sẽ tìm thấy nhịp đập đồng điệu. Để mùa đông không còn lạnh, mùa xuân thêm rực rỡ, và cuộc đời này bớt đi những khoảng trống lẻ loi.",
    "Mong duyên lành năm nay sẽ đến như én báo xuân. Người cần gặp sẽ gặp, người cần yêu sẽ yêu. Chuyện tình đẹp như thơ, êm như mộng, kết thúc bằng một cái kết viên mãn.",
    "Chúc bạn một năm tràn ngập yêu thương: Yêu mình, yêu người, và được cuộc đời đáp lại bằng những cái ôm thật chặt, những lời động viên chân thành nhất những lúc yếu lòng.",
    "Xuân về mang theo nắng ấm, mong tình người cũng tựa đóa hoa. Dẫu có qua bao hiểu lầm hay giận hờn, vẫn kiêu hãnh tỏa hương thơm ngát của sự bao dung và tha thứ.",
    "Chúc gia đạo an khang, trong ấm ngoài êm. Cha mẹ mạnh khỏe tựa thái sơn, con cháu sum vầy ríu rít như bầy chim én, tiếng cười nói rộn ràng khắp gian nhà ngày Tết.",
    "Năm mới, chúc bạn tìm được một người tri kỷ: Cùng bạn uống trà, cùng bạn ngắm trăng, lắng nghe những điều bạn chưa nói và cùng bạn già đi giữa cuộc đời bình dị này.",
    "Mong rằng năm nay, mọi nỗi buồn trong chuyện tình cảm sẽ hóa thành những cơn mưa rào mùa hạ: Đến nhanh, đi nhanh, gột rửa bụi bặm để lại bầu trời trong xanh và cầu vồng rực rỡ.",
    "Chúc tình thân thêm bền chặt, tình bạn thêm keo sơn. Dù cuộc đời có đổi thay, mong chúng ta vẫn mãi là điểm tựa tinh thần vững chắc, là nơi chốn bình yên để quay về.",
    "Năm mới, chúc bạn luôn được vây quanh bởi những người thiện lương. Những người mang đến năng lượng tích cực, nụ cười vui vẻ và cảm hứng sống đẹp mỗi ngày.",
    "Cầu cho ông bà, cha mẹ sống vui sống khỏe, \"Phúc như Đông Hải, Thọ tỷ Nam Sơn\". Mãi là cây cao bóng cả che chở và dẫn lối cho con cháu trên đường đời.",
    "Chúc vợ chồng đồng lòng tát cạn biển Đông. Tương kính như tân, yêu thương như thuở ban đầu, cùng nhau vun đắp tổ ấm nhỏ thành một bến đỗ bình yên nhất trần gian.",
    "Năm mới, mong bạn biết yêu thương bản thân nhiều hơn. Chăm chút cho tâm hồn, nuông chiều cảm xúc, để tự mình trở thành đóa hoa rực rỡ nhất trong khu vườn của chính mình.",
    "Chúc cho những cuộc hội ngộ năm nay đều tràn đầy ý nghĩa. Tay bắt mặt mừng, hàn huyên chuyện cũ, nâng ly chúc tụng, để tình cảm thêm gắn kết, mặn nồng theo năm tháng.",
    "Mong năm nay nhà nào cũng đỏ lửa yêu thương. Bếp núc ấm cúng, mâm cơm đầy đặn, thành viên đông đủ, không ai phải lẻ loi hay cô độc trong những ngày Tết đoàn viên.",
    "Chúc bạn có một tình yêu đẹp như trong tiểu thuyết, nhưng bền vững hơn cả thực tế. Một tình yêu đủ lớn để bao dung mọi khuyết điểm, đủ sâu để đi cùng nhau đến cuối con đường.",
    "Năm mới, chúc bạn gieo yêu thương gặt hạnh phúc. Trao đi nụ cười nhận lại niềm vui. Đối xử dịu dàng với thế giới, và thế giới sẽ dịu dàng lại với bạn gấp ngàn lần.",
    "Cầu mong sợi dây tình cảm giữa chúng ta sẽ không bao giờ đứt gãy dù khoảng cách địa lý có xa xôi. Luôn nhớ về nhau với những ký ức đẹp đẽ và những lời chúc tốt lành nhất.",
    "Chúc năm mới hạnh phúc tròn đầy như trăng rằm tháng Tám. Viên mãn trong tình cảm, dư dả trong yêu thương, để mỗi ngày trôi qua đều ngọt ngào như mật ong tháng Chạp.",

    // === PHẦN 4: SỨC KHỎE & SỰ TƯƠI TRẺ ===
    "Đầu xuân năm mới, chúc bạn sức khỏe tựa núi non hùng vĩ, tinh thần dẻo dai như dòng sông chảy mãi. Bệnh tật lùi xa, chỉ còn lại sự cường tráng và năng lượng tràn trề.",
    "Chúc bạn một năm \"Thân cường, Tâm sáng\". Ăn ngon miệng, ngủ sâu giấc, làm việc không biết mệt, vui chơi không biết chán, tận hưởng trọn vẹn mọi hương vị của cuộc sống.",
    "Mong năm nay bạn sở hữu sức sống mãnh liệt như mầm non mùa xuân. Vươn lên mạnh mẽ đón nắng trời, không ngại gió sương, luôn xanh tươi và tràn đầy nhựa sống mỗi ngày.",
    "Chúc ông bà mắt sáng, tai thinh, chân tay nhanh nhẹn. Sống vui cùng con cháu, mỗi ngày đều là một ngày khỏe mạnh, không phiền muộn, không đau ốm, an hưởng tuổi già viên mãn.",
    "Năm mới, chúc bạn chăm sóc \"ngôi nhà cơ thể\" thật tốt. Để nó luôn là nơi trú ngụ vững chắc nhất cho tâm hồn, giúp bạn đi đến bất cứ nơi đâu bạn muốn trên thế gian này.",
    "Cầu cho bạn có một trái tim khỏe mạnh để yêu thương, một đôi chân vững chãi để đi xa, một đôi tay khéo léo để làm việc, và một khối óc minh mẫn để sáng tạo không ngừng.",
    "Chúc bạn năm nay trẻ trung phơi phới, nụ cười luôn rạng rỡ trên môi. Tuổi tác chỉ là con số, quan trọng là tâm hồn lúc nào cũng tươi mới như độ tuổi đôi mươi xuân thì.",
    "Mong năm mới bệnh vặt tan biến, bệnh lớn không sinh. Sức đề kháng mạnh mẽ như tường thành, bảo vệ bạn trước mọi tác động xấu của môi trường, để luôn an nhiên sống khỏe.",
    "Chúc các bé hay ăn chóng lớn, ngoan ngoãn vâng lời. Thông minh lanh lợi, khỏe mạnh như thánh Gióng, là niềm vui, là hy vọng và là tương lai rạng rỡ của cả gia đình.",
    "Năm mới, chúc bạn tìm được niềm vui trong việc rèn luyện sức khỏe. Mỗi giọt mồ hôi rơi xuống là một sự đầu tư cho tương lai dẻo dai, bền bỉ và hạnh phúc dài lâu.",
    "Cầu chúc cho bạn có giấc ngủ êm đềm mỗi đêm, không mộng mị. Để sáng mai thức dậy với cơ thể nhẹ nhàng, tinh thần sảng khoái, sẵn sàng đón chào một ngày mới tuyệt vời.",
    "Chúc bạn năm nay luôn giữ được vóc dáng cân đối, thần thái rạng ngời. Khỏe đẹp từ bên trong, tỏa sáng ra bên ngoài, tự tin chinh phục mọi ánh nhìn và mọi thử thách.",
    "Mong rằng sức khỏe của bạn năm nay sẽ như cây cổ thụ ngàn năm: Gốc rễ bám sâu, cành lá sum suê, đứng vững giữa trời đất mặc cho bốn mùa thay đổi luân phiên.",
    "Chúc bạn một năm không phải ghé thăm bệnh viện, không phải làm bạn với thuốc thang. Chỉ có những chuyến đi chơi xa, những bữa ăn ngon và những tiếng cười sảng khoái.",
    "Năm mới, chúc bạn biết lắng nghe cơ thể mình hơn. Nghỉ ngơi khi mệt, ăn uống điều độ, sống chậm lại để cảm nhận sự quý giá của từng nhịp thở, từng nhịp tim đập.",
    "Cầu cho bạn sở hữu nguồn năng lượng tích cực vô tận. Lan tỏa sức sống ấy đến mọi người xung quanh, làm cho không gian nơi bạn đến cũng trở nên tươi vui và khỏe khoắn hơn.",
    "Chúc bạn năm nay có đôi mắt sáng để nhìn thấu sự đời, đôi tai thính để nghe lời hay ý đẹp, và cái đầu lạnh để giữ gìn sức khỏe trước những cám dỗ của cuộc vui.",
    "Mong bạn luôn giữ được nụ cười \"mười thang thuốc bổ\". Cười nhiều hơn, lo âu ít đi, để tâm trí luôn thư thái, cơ thể luôn nhẹ nhõm, bệnh tật tự khắc lùi xa.",
    "Chúc năm mới khí huyết lưu thông, tinh thần phấn chấn. Mỗi ngày trôi qua đều cảm thấy mình khỏe hơn hôm qua, đẹp hơn hôm kia và hạnh phúc hơn bao giờ hết.",
    "Cầu chúc một năm bình an vô sự về sức khỏe. Để bạn có đủ sức lực thực hiện mọi ước mơ, chăm sóc những người thân yêu và tận hưởng cuộc sống tươi đẹp này trọn vẹn nhất.",

    // === PHẦN 5: VĂN HỌC & GIÀU HÌNH ẢNH ===
    "Khép lại trang sách cũ ố màu, chúc bạn năm nay viết tiếp chương đời bằng mực của niềm tin và nét bút kiên cường. Để mỗi dòng chữ đều lấp lánh ánh kim của hy vọng.",
    "Mong năm mới đời bạn đẹp như một bài thơ lục bát: Nhịp nhàng, êm ái, vần điệu chỉn chu. Buồn vui đan xen hài hòa, tạo nên một tác phẩm nghệ thuật sâu sắc và đáng nhớ.",
    "Chúc bạn như cánh én chao nghiêng giữa bầu trời xuân: Tự do bay lượn, không ràng buộc, không ưu phiền. Chạm tay vào đâu cũng thấy nắng vàng, hạ cánh nơi nào cũng thấy hoa thơm.",
    "Xuân về, mong bạn gom đủ nắng để sưởi ấm tim mình, gom đủ gió để thổi bay muộn phiền, và gom đủ yêu thương để dệt nên chiếc áo hạnh phúc mặc suốt cả năm dài.",
    "Chúc cuộc đời bạn năm nay rực rỡ như một bức tranh sơn dầu: Đa sắc màu, giàu cảm xúc. Có gam trầm của sự tĩnh lặng, có gam nóng của nhiệt huyết, tạo nên tổng thể hoàn mỹ.",
    "Năm mới, chúc bạn sống như một đóa hoa dại: Kiên cường vươn lên giữa sỏi đá khô cằn, nhưng vẫn nở ra những bông hoa đẹp nhất, ngát hương nhất hiến dâng cho đời.",
    "Cầu cho tâm hồn bạn luôn được tưới tắm bởi những cơn mưa văn chương và nghệ thuật. Để thấy đời không chỉ có cơm áo gạo tiền, mà còn có trăng sao, gió mát và những giấc mơ.",
    "Chúc bạn năm nay có những chuyến đi dài như những trang du ký. Đi để thấy mình nhỏ bé, đi để thấy đời bao la, đi để làm giàu thêm vốn sống và tâm hồn mình.",
    "Mong rằng năm mới, bạn sẽ là nhạc trưởng tài ba chỉ huy bản giao hưởng cuộc đời mình. Lúc trầm lúc bổng, lúc khoan lúc nhặt, nhưng luôn giữ được giai điệu của sự lạc quan.",
    "Chúc bạn giữ được \"sơ tâm\" trong trẻo như giọt sương mai trên lá sen. Dù đi qua bao bụi bặm phố thị, vẫn giữ được sự tinh khôi, thuần khiết và thiện lương ban đầu.",
    "Năm mới, chúc bạn có những khoảnh khắc \"tĩnh\" giữa dòng đời \"động\". Như khoảng lặng trong một bản nhạc, tuy không có âm thanh nhưng lại chứa đựng nhiều ý nghĩa và cảm xúc nhất.",
    "Cầu chúc cho những giấc mơ của bạn năm nay sẽ không còn nằm im lìm trong ngăn kéo, mà sẽ được chắp cánh bay cao, vút lên bầu trời xanh thẳm của hiện thực rạng ngời.",
    "Chúc bạn năm mới: Túi rủng rỉnh tiền tài, nhưng tâm hồn vẫn rủng rỉnh thơ ca. Giàu sang mà không vướng bận tục trần, phú quý mà vẫn thanh cao, tao nhã như người xưa.",
    "Mong bạn luôn nhìn cuộc đời qua lăng kính vạn hoa rực rỡ. Để thấy trong cái rủi có cái may, trong khó khăn có cơ hội, và trong mỗi con người đều có những nét đẹp riêng.",
    "Chúc năm mới bạn sẽ \"nở hoa\" từ chính những vết nứt của quá khứ. Biến đau thương thành sức mạnh, biến nước mắt thành kim cương, tỏa sáng lấp lánh khiến ai cũng phải ngước nhìn.",
    "Năm nay, chúc bạn sống trọn vẹn như một ngọn nến: Cháy hết mình, tỏa sáng hết mình đến giọt sáp cuối cùng. Để lại ánh sáng ấm áp và dư vị đẹp đẽ cho thế gian.",
    "Cầu cho bạn có đủ sự tinh tế để nghe được tiếng hoa nở, tiếng lá rơi. Để thấy cuộc sống này không chỉ vận hành bằng tiếng còi xe, mà còn bằng những âm thanh diệu kỳ của thiên nhiên.",
    "Chúc bạn năm mới gom nhặt được những \"mảnh vỡ\" của niềm vui nhỏ bé mỗi ngày, ghép lại thành một bức tranh hạnh phúc to lớn, bền vững và không gì có thể phá vỡ nổi.",
    "Mong rằng tâm hồn bạn sẽ luôn là một khu vườn xanh mát, nơi chim chóc về làm tổ, bướm ong về hút mật. Là chốn bình yên cho chính mình và cho những người xung quanh nương náu.",
    "Chúc một năm mới \"Văn hay chữ tốt, Đức rộng tài cao\". Sống đẹp như hoa, vững chãi như đá, mềm mại như nước, và rực rỡ như ánh mặt trời ban mai ngày đầu xuân."
];

const DEFAULT_SETTINGS = {
    luckyMoneyChance: 5,       // 5% tỉ lệ trúng lì xì
    luckyMoneyAmounts: [20000, 50000, 100000],  // Mệnh giá
    adminPassword: "admin"
};

// =================== STORAGE HELPERS ===================

function getWishes() {
    const stored = localStorage.getItem('tetWishes');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fallback */ }
    }
    // First time: save defaults
    saveWishes(DEFAULT_WISHES);
    return [...DEFAULT_WISHES];
}

function saveWishes(wishes) {
    localStorage.setItem('tetWishes', JSON.stringify(wishes));
}

function getSettings() {
    const stored = localStorage.getItem('tetSettings');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fallback */ }
    }
    saveSettings(DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
}

function saveSettings(settings) {
    localStorage.setItem('tetSettings', JSON.stringify(settings));
}

function getStats() {
    const stored = localStorage.getItem('tetStats');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fallback */ }
    }
    const defaults = { totalSpins: 0, totalLuckyMoney: 0, luckyMoneyCount: 0, history: [] };
    saveStats(defaults);
    return defaults;
}

function saveStats(stats) {
    localStorage.setItem('tetStats', JSON.stringify(stats));
}

function recordSpin(wish, luckyAmount) {
    const stats = getStats();
    stats.totalSpins++;
    if (luckyAmount > 0) {
        stats.totalLuckyMoney += luckyAmount;
        stats.luckyMoneyCount++;
    }
    stats.history.unshift({
        wish,
        luckyAmount,
        time: new Date().toLocaleString('vi-VN')
    });
    // Keep only last 200 entries
    if (stats.history.length > 200) stats.history = stats.history.slice(0, 200);
    saveStats(stats);
}

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function resetToDefaults() {
    saveWishes(DEFAULT_WISHES);
    saveSettings(DEFAULT_SETTINGS);
}
